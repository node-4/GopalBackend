// const mongoose = require("mongoose");
// const Subscription = require("../../model/subscription");

// // Create a new subscription
// exports.createSubscription = async function (restaurantId, userId, subscriptionType) {
//   try {
//     const subscription = new Subscription({
//       restaurantId,
//       userId,
//       subscriptionType,
//     });
//     await subscription.save();
//     return subscription;
//   } catch (error) {
//     throw new Error(`Failed to create subscription: ${error.message}`);
//   }
// };

// // Get a subscription by ID
// exports.getSubscriptionById = async function (subscriptionId) {
//   try {
//     const subscription = await Subscription.findById(subscriptionId);
//     return subscription;
//   } catch (error) {
//     throw new Error(`Failed to get subscription by ID: ${error.message}`);
//   }
// };

// // Update a subscription
// exports.updateSubscription = async function (subscriptionId, updates) {
//   try {
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       updates,
//       { new: true }
//     );
//     return subscription;
//   } catch (error) {
//     throw new Error(`Failed to update subscription: ${error.message}`);
//   }
// };

// // Delete a subscription
// exports.deleteSubscription = async function (subscriptionId) {
//   try {
//     await Subscription.findByIdAndDelete(subscriptionId);
//   } catch (error) {
//     throw new Error(`Failed to delete subscription: ${error.message}`);
//   }
// };

// // Get all subscriptions for a restaurant
// exports.getSubscriptionsForRestaurant = async function (restaurantId) {
//   try {
//     const subscriptions = await Subscription.find({ restaurantId });
//     return subscriptions;
//   } catch (error) {
//     throw new Error(`Failed to get subscriptions for restaurant: ${error.message}`);
//   }
// };

// // Get all subscriptions for a user
// exports.getSubscriptionsForUser = async function (userId) {
//   try {
//     const subscriptions = await Subscription.find({ userId });
//     return subscriptions;
//   } catch (error) {
//     throw new Error(`Failed to get subscriptions for user: ${error.message}`);
//   }
// };

// // Get all subscriptions
// exports.getAllSubscriptions = async function () {
//   try {
//     const subscriptions = await Subscription.find();
//     return subscriptions;
//   } catch (error) {
//     throw new Error(`Failed to get all subscriptions: ${error.message}`);
//   }
// };
