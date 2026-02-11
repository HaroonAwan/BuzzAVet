import React from 'react';
import { Testimonial } from '../sections/Testimonials';
import { theme } from '@/lib/theme';
import { StarIcon } from '@/assets/icon-components/StarIcon';
import { Avatar } from '@/components/shared/Avatar';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div
      className="flex flex-col rounded-2xl p-8"
      style={{ backgroundColor: theme.colors.background.secondary }}
    >
      {/* Stars */}
      <div className="mb-4 flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <StarIcon key={i} size={18} />
        ))}
      </div>

      {/* Testimonial Text */}
      <p
        className="mb-5 line-clamp-4 grow text-sm leading-relaxed"
        style={{ color: theme.colors.text.secondary }}
      >
        {testimonial.text}
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <Avatar src={testimonial.image} name={testimonial.name} className="rounded-full" />
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold">{testimonial.name}</h4>
          <p className="truncate text-xs" style={{ color: theme.colors.text.tertiary }}>
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
