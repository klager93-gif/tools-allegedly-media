/*
Signal Labs
Area: Signal Schedule
File: schedule/components/toolbar.js
Version: v4.8.1
Purpose: Reusable toolbar action metadata helpers.
*/
export const toolbarComponentVersion = "v4.8.1";
export function toolbarAction(label, action, variant = "secondary") { return { label, action, variant }; }
