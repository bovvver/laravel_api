<?php
use App\Http\Controllers\Api\V2\TaskController;
use App\Http\Controllers\Api\V2\CompleteTaskController;
use App\Http\Controllers\Api\V2\SummaryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('v2')->group(function () {
    Route::apiResource('/tasks', TaskController::class);
    Route::get('/summaries', SummaryController::class);
    Route::patch('/tasks/{task}/complete', CompleteTaskController::class);
});