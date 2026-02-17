'use client';

import React from 'react';
import { StarIcon } from '@/assets/icon-components';
import { Avatar } from '@/components/shared/Avatar';
import { theme } from '@/lib/theme';
import { Button } from '@/components/shared/Button';
import { HospitalDetailsResponse } from '@/types/hospitalsTypes';

interface ReviewsTabProps {
  hospital: HospitalDetailsResponse;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ hospital }) => {
  const [showAllReviews, setShowAllReviews] = React.useState(false);
  const reviews = Array.isArray(hospital.reviews) ? hospital.reviews : [];
  const totalReviews = reviews.length;
  const totalRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + (typeof r.ratings === 'number' ? r.ratings : 0), 0) /
        totalReviews
      : 0;
  // Calculate rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    stars: star,
    count: reviews.filter((r) => r.ratings === star).length,
  }));
  const maxCount = Math.max(...ratingBreakdown.map((r) => r.count), 1);
  // Map reviews for display
  const mappedReviews = reviews.map((r) => ({
    id: r._id,
    authorName:
      r.reviewer?.firstName || r.reviewer?.lastName
        ? `${r.reviewer?.firstName ?? ''} ${r.reviewer?.lastName ?? ''}`.trim()
        : r.reviewer?.email || 'Anonymous',
    authorImage: r.reviewer?.profilePicture || '/placeholder-avatar.jpg',
    rating: r.ratings,
    text: r.review,
    postedAt: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '',
  }));
  const displayedReviews = showAllReviews ? mappedReviews : mappedReviews.slice(0, 5);

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Section with Rating Summary */}
      <div
        className="flex items-center justify-between gap-8 rounded-xl p-5"
        style={{ backgroundColor: theme.colors.background.secondary }}
      >
        {/* Overall Rating */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="forty-eight leading-none font-bold"
            style={{ color: theme.colors.text.default }}
          >
            {totalRating.toFixed(1)}
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                size={14}
                fill={
                  i < Math.round(totalRating)
                    ? theme.colors.special.verifiedBadge
                    : theme.colors.border.default
                }
              />
            ))}
          </div>
          <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
            {totalReviews} reviews
          </p>
        </div>
        {/* Divider */}
        <div className="my-auto h-16 w-px bg-(--color-muted)" />
        {/* Rating Breakdown */}
        <div className="flex flex-1 flex-col gap-2">
          {ratingBreakdown
            .sort((a, b) => b.stars - a.stars)
            .map((item) => {
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="flex gap-1 text-sm font-medium">{item.stars} stars</span>
                  {/* Progress Bar */}
                  <div
                    className="h-2 flex-1 overflow-hidden rounded-full"
                    style={{ backgroundColor: theme.colors.background.muted }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: theme.colors.special.verifiedBadge,
                      }}
                    />
                  </div>
                  <span
                    className="w-8 text-right text-sm"
                    style={{ color: theme.colors.text.tertiary }}
                  >
                    {item.count}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b pb-6"
            style={{ borderColor: theme.colors.border.default }}
          >
            {/* Reviewer Header */}
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar src={review.authorImage} name={review.authorName} size="sm" />
                <div>
                  <h4 className="text-sm font-semibold">{review.authorName}</h4>
                </div>
              </div>
              <p className="text-xs" style={{ color: theme.colors.text.muted }}>
                {review.postedAt}
              </p>
            </div>

            {/* Star Rating */}
            <div className="mb-2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={12}
                  fill={
                    i < review.rating
                      ? theme.colors.special.verifiedBadge
                      : theme.colors.border.default
                  }
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-sm font-medium">{review.text}</p>
          </div>
        ))}
      </div>

      {/* View All Reviews Button */}
      {mappedReviews.length > 5 && (
        <div className="flex justify-center">
          <Button variant="underline" onClick={() => setShowAllReviews(!showAllReviews)}>
            {showAllReviews ? 'View Less' : 'View All Reviews'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
