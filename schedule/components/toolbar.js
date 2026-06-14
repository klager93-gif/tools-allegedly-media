/*
Signal Labs
Area: Signal Schedule
File: schedule/components/toolbar.js
Version: v5.0.0
Purpose: Reusable toolbar action metadata helpers.
*/
export const toolbarComponentVersion = "v5.0.0";
export function toolbarAction(label, action, variant = "secondary") { return { label, action, variant }; }
