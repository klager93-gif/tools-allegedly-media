/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/RequestApprovalWorkflowRepository.js
Version: v2.18.0
Purpose: Repository boundary for request approval workflow data
*/
import { fetchRequestApprovalWorkflowPreview } from '../adapters/JsonRequestApprovalWorkflowAdapter.js';
export async function listRequestApprovalWorkflowPreview() { return fetchRequestApprovalWorkflowPreview(); }
