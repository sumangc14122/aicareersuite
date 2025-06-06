// import { SubscriptionLevel } from "./subscription";

// export function canCreateResume(
//   subscriptionLevel: SubscriptionLevel,
//   currentResumeCount: number,
// ) {
//   const maxResumeMap: Record<SubscriptionLevel, number> = {
//     free: 1,
//     pro: 2,
//     pro_plus: Infinity,
//   };

//   const maxResumes = maxResumeMap[subscriptionLevel];

//   return currentResumeCount < maxResumes;
// }

// export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
//   return subscriptionLevel !== "free";
//   // return true;
// }

// export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
//   return subscriptionLevel === "pro_plus";
// }

import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 5,
    pro: Infinity,
    pro_plus: Infinity,
  };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel !== "free";
}

export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "pro_plus";
}

export function canCreateProfileResume(
  level: SubscriptionLevel,
  count: number,
) {
  return level === "free" ? count < 3 : true;
}

// import { SubscriptionLevel } from "./subscription";

// export function canCreateProfileResume(
//   level: SubscriptionLevel,
//   count: number
// ) {
//   const limits: Record<SubscriptionLevel, number> = {
//     free: 3,
//     pro: 10,
//     pro_plus: Infinity,
//   };
//   return count < limits[level];
// }
