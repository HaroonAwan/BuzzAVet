import React from 'react';
import { Testimonial } from '../sections/Testimonials';
import { theme } from '@/lib/theme';
import { StarIcon } from '@/assets/icon-components/StarIcon';
import { Avatar } from '@/components/shared/Avatar';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div
      className="rounded-2xl p-8 flex flex-col"
      style={{ backgroundColor: theme.colors.background.secondary }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <StarIcon key={i} size={18} />
        ))}
      </div>

      {/* Testimonial Text */}
      <p
        className="text-sm leading-relaxed mb-5 grow line-clamp-4"
        style={{ color: theme.colors.text.secondary }}
      >
        {testimonial.text}
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <Avatar src={testimonial.image} name={testimonial.name} className="rounded-full" />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{testimonial.name}</h4>
          <p className="text-xs truncate" style={{ color: theme.colors.text.tertiary }}>
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
