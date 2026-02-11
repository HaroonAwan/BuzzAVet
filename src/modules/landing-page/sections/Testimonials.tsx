import SectionsWrapper from '@/layouts/SectionsWrapper';
import InfoWrapper from '../layouts/InfoWrapper';
import TestimonialCard from '../layouts/TestimonialCard';

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    title: 'Owner of Luna Golden Retriever',
    image: '/assets/images/shared/testimonial-1.jpg',
    rating: 5,
    text: '"BuzzAVet has been a lifesaver! The telemedicine feature is incredible. I can get expert advice without the stress of bringing my highly anxious dog to the clinic. Highly recommended!"',
  },
  {
    id: 2,
    name: 'James Patterson',
    title: 'Owner of Luna (Persian Cat)',
    image: '/assets/images/shared/testimonial-2.jpg',
    rating: 5,
    text: '"The vets at BuzzAVet are so compassionate and knowledgeable. They saved my cat\'s life during an emergency, and I\'m forever grateful. The 24/7 availability is perfect."',
  },
  {
    id: 3,
    name: 'Emily Chen',
    title: 'Owner of Charlie (Beagle)',
    image: '/assets/images/shared/testimonial-3.jpg',
    rating: 5,
    text: '"I love the convenience of booking appointments online and the mobile vet service is fantastic. The team genuinely cares about pets and their health. Highly recommended!"',
  },
];

const Testimonials = () => {
  return (
    <SectionsWrapper>
      <InfoWrapper
        sectionTitle="Testimonials"
        title="What Our Patients Say"
        subTitle="Don't just take our word for it - hear from the pet owners who trust us with their furry family members."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </InfoWrapper>
    </SectionsWrapper>
  );
};

export default Testimonials;
