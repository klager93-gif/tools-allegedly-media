/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/RequestApprovalWorkflowRepository.js
Version: v3.3.3
Purpose: Repository boundary for request approval workflow data
*/
import { fetchRequestApprovalWorkflowPreview } from '../adapters/JsonRequestApprovalWorkflowAdapter.js';
export async function listRequestApprovalWorkflowPreview() { return fetchRequestApprovalWorkflowPreview(); }
