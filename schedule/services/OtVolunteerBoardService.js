/*
Signal Labs
Area: Signal Schedule
File: schedule/services/OtVolunteerBoardService.js
Version: v5.1.0
Purpose: Service layer for OT Volunteer Board Foundation
*/
import { getOtVolunteerBoardPreview } from '../repositories/OtVolunteerBoardRepository.js';

export async function getOtVolunteerBoardDashboard() {
  const data = await getOtVolunteerBoardPreview();
  const volunteersByOpportunity = (data.volunteers || []).reduce((acc, volunteer) => {
    acc[volunteer.opportunityId] = acc[volunteer.opportunityId] || [];
    acc[volunteer.opportunityId].push(volunteer);
    return acc;
  }, {});
  const opportunities = (data.opportunities || []).map((opportunity) => ({
    ...opportunity,
    volunteers: volunteersByOpportunity[opportunity.id] || [],
    eligibleCount: (volunteersByOpportunity[opportunity.id] || []).filter((volunteer) => volunteer.status === 'eligible').length
  }));
  return { ...data, opportunities, volunteersByOpportunity };
}

export function getRecommendedVolunteer(opportunity, volunteersByOpportunity = {}) {
  const volunteers = volunteersByOpportunity[opportunity.id] || opportunity.volunteers || [];
  return volunteers.find((volunteer) => volunteer.id === opportunity.recommendedVolunteerId) || volunteers.find((volunteer) => volunteer.status === 'eligible') || null;
}
