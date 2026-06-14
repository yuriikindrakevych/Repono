<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ReleaseChannel;
use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Product;
use App\Models\Release;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class ReleaseController extends Controller
{
    public function store(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'version' => ['required', 'string', 'max:32', 'regex:/^\d+\.\d+\.\d+(-[\w.]+)?$/',
                Rule::unique('releases', 'version')->where('product_id', $product->id)],
            'channel' => ['required', new Enum(ReleaseChannel::class)],
            'changelog' => ['nullable', 'string'],
            'artifact' => ['required', 'file', 'mimetypes:application/zip,application/octet-stream', 'max:51200'],
            'publish' => ['boolean'],
        ]);

        $path = Storage::disk('local')->putFileAs(
            'artifacts/'.$product->slug,
            $request->file('artifact'),
            $data['version'].'.zip'
        );
        abort_if($path === false, 500, 'Could not store the artifact — check storage permissions.');
        $full = Storage::disk('local')->path($path);

        $publish = (bool) ($data['publish'] ?? false);
        $release = $product->releases()->create([
            'version' => $data['version'],
            'channel' => $data['channel'],
            'changelog' => $data['changelog'] ?? null,
            'artifact_path' => $path,
            'checksum' => hash_file('sha256', $full),
            'artifact_size' => filesize($full),
            'is_published' => $publish,
            'released_at' => $publish ? Carbon::now() : null,
        ]);

        AuditLog::record('release', 'release.uploaded',
            "Release {$release->version} of {$product->name} uploaded".($publish ? ' and published' : ''), $release);

        return back()->with('flash', "Release {$release->version} uploaded.");
    }

    public function publish(Release $release): RedirectResponse
    {
        $release->update([
            'is_published' => true,
            'released_at' => $release->released_at ?? Carbon::now(),
        ]);

        AuditLog::record('release', 'release.published',
            "Release {$release->version} published — available to active licenses", $release);

        return back()->with('flash', "Release {$release->version} published.");
    }

    public function unpublish(Release $release): RedirectResponse
    {
        $release->update(['is_published' => false]);

        AuditLog::record('release', 'release.unpublished', "Release {$release->version} unpublished", $release);

        return back()->with('flash', "Release {$release->version} unpublished.");
    }

    public function destroy(Release $release): RedirectResponse
    {
        if ($release->artifact_path) {
            Storage::disk('local')->delete($release->artifact_path);
        }
        $version = $release->version;
        $release->delete();

        AuditLog::record('release', 'release.deleted', "Release {$version} deleted", null);

        return back()->with('flash', "Release {$version} deleted.");
    }
}
