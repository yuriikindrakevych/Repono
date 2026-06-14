<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditController extends Controller
{
    public function index(Request $request): Response
    {
        $category = $request->query('category');

        $logs = AuditLog::query()
            ->with('user:id,name')
            ->when($category, fn ($q) => $q->where('category', $category))
            ->latest()
            ->paginate(30)
            ->withQueryString()
            ->through(fn (AuditLog $log) => [
                'id' => $log->id,
                'category' => $log->category,
                'action' => $log->action,
                'description' => $log->description,
                'actor' => $log->user?->name ?? 'system',
                'at' => $log->created_at?->format('M j, Y H:i'),
            ]);

        return Inertia::render('Admin/Audit', [
            'logs' => $logs,
            'category' => $category,
            'categories' => ['payment', 'receipt', 'license', 'subscription', 'activation', 'catalog', 'release'],
        ]);
    }
}
