/*
Signal Labs
Area: Signal Schedule
File: schedule/services/RequestApprovalWorkflowService.js
Version: v5.1.0
Purpose: Service layer for request approval workflow preview logic
*/
import { listRequestApprovalWorkflowPreview } from '../repositories/RequestApprovalWorkflowRepository.js';
export async function getRequestApprovalWorkflowPreview() {
  const data = await listRequestApprovalWorkflowPreview();
  const totalPending = data.queues.reduce((sum, queue) => sum + Number(queue.pending || 0), 0);
  return { ...data, totalPending };
}
