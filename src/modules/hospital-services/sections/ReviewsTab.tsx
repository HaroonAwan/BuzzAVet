'use client';

import React from 'react';
import { StarIcon } from '@/assets/icon-components';
import { Avatar } from '@/components/shared/Avatar';
import { theme } from '@/lib/theme';
import { Button } from '@/components/shared/Button';

interface Review {
  id: string;
  authorName: string;
  authorImage: string;
  rating: number;
  text: string;
  postedAt: string;
}

const dummyReviews: Review[] = [
  {
    id: '1',
    authorName: 'Sarah Martinez',
    authorImage: '/placeholder-avatar.jpg',
    rating: 5,
    text: 'Excellent care for my dog Max. The staff is incredibly caring and professional. Dr. Smith took great time to explain the treatment plan.',
    postedAt: '2 weeks ago',
  },
  {
    id: '2',
    authorName: 'Mike Chen',
    authorImage: '/placeholder-avatar.jpg',
    rating: 5,
    text: "Clean facility with modern equipment. The emergency service saved my cat's life. Highly recommend this hospital.",
    postedAt: '1 month ago',
  },
  {
    id: '3',
    authorName: 'Sarah Martinez',
    authorImage: '/placeholder-avatar.jpg',
    rating: 5,
    text: 'Excellent care for my dog Max. The staff is incredibly caring and professional. Dr. Smith took great time to explain the treatment plan.',
    postedAt: '2 weeks ago',
  },
  {
    id: '4',
    authorName: 'Mike Chen',
    authorImage: '/placeholder-avatar.jpg',
    rating: 5,
    text: "Clean facility with modern equipment. The emergency service saved my cat's life. Highly recommend this hospital.",
    postedAt: '1 month ago',
  },
  {
    id: '5',
    authorName: 'Emily Rodriguez',
    authorImage: '/placeholder-avatar.jpg',
    rating: 4,
    text: "Very professional veterinarians. They took time to answer all my questions about my rabbit's health. Great experience overall.",
    postedAt: '3 weeks ago',
  },
  {
    id: '6',
    authorName: 'James Wilson',
    authorImage: '/placeholder-avatar.jpg',
    rating: 5,
    text: 'Best veterinary hospital in the city. The care and attention they gave to my bird was exceptional. Would definitely come back.',
    postedAt: '5 days ago',
  },
  {
    id: '7',
    authorName: 'Lisa Anderson',
    authorImage: '/placeholder-avatar.jpg',
    rating: 4,
    text: 'Good service and friendly staff. Prices are reasonable for the quality of care provided. Highly satisfied with our visit.',
    postedAt: '2 months ago',
  },
  {
    id: '8',
    authorName: 'David Thompson',
    authorImage: '/placeholder-avatar.jpg',
    rating: 5,
    text: 'Took my puppy here for vaccinations and check-up. The doctors were gentle and made my pet feel comfortable. Great hospital!',
    postedAt: '1 week ago',
  },
  {
    id: '9',
    authorName: 'Jennifer Garcia',
    authorImage: '/placeholder-avatar.jpg',
    rating: 5,
    text: "Outstanding medical care. They diagnosed my cat's condition quickly and provided excellent treatment. Very grateful for their expertise.",
    postedAt: '3 days ago',
  },
  {
    id: '10',
    authorName: 'Robert Lee',
    authorImage: '/placeholder-avatar.jpg',
    rating: 4,
    text: 'Professional team with modern equipment. My dog recovered well after surgery. Recommend them to all pet owners.',
    postedAt: '2 weeks ago',
  },
];

const dummyRatingBreakdown = [
  { stars: 5, count: 388 },
  { stars: 4, count: 34 },
  { stars: 3, count: 6 },
  // { stars: 2, count: 0 },
  // { stars: 1, count: 0 },
];

const ReviewsTab: React.FC = () => {
  const [showAllReviews, setShowAllReviews] = React.useState(false);
  const totalRating = 4.9;
  const totalReviews = 428;
  const ratingBreakdown = dummyRatingBreakdown;
  const displayedReviews = showAllReviews ? dummyReviews : dummyReviews.slice(0, 5);
  const maxCount = Math.max(...ratingBreakdown.map((r) => r.count), 1);

  return (
    <div className="w-full gap-6 flex flex-col">
      {/* Header Section with Rating Summary */}
      <div
        className="flex gap-8 p-5 rounded-xl items-center justify-between"
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
        <div className="w-px h-16 my-auto bg-(--color-muted)" />
        {/* Rating Breakdown */}
        <div className="flex-1 flex flex-col gap-2">
          {ratingBreakdown
            .sort((a, b) => b.stars - a.stars)
            .map((item) => {
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-sm flex gap-1 font-medium">{item.stars} stars</span>
                  {/* Progress Bar */}
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
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
                    className="text-sm w-8 text-right"
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
            className="pb-6 border-b"
            style={{ borderColor: theme.colors.border.default }}
          >
            {/* Reviewer Header */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <Avatar src={review.authorImage} name={review.authorName} size="sm" />
                <div>
                  <h4 className="font-semibold text-sm">{review.authorName}</h4>
                </div>
              </div>
              <p className="text-xs" style={{ color: theme.colors.text.muted }}>
                {review.postedAt}
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex gap-1 mb-2">
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
      <div className="flex justify-center">
        <Button variant="underline" onClick={() => setShowAllReviews(!showAllReviews)}>
          {showAllReviews ? 'View Less' : 'View All Reviews'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewsTab;
