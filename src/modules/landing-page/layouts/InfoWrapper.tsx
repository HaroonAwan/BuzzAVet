import { theme } from '@/lib/theme';

interface InfoWrapperProps {
  title: string;
  sectionTitle: string;
  subTitle: string;
  children: React.ReactNode;
}

const InfoWrapper: React.FC<InfoWrapperProps> = ({ children, title, sectionTitle, subTitle }) => {
  return (
    <div className="flex flex-col gap-15 container">
      <div className="flex flex-col text-center gap-3 leading-tight max-w-2xl mx-auto">
        <h1 className="font-semibold" style={{ color: theme.colors.background.range }}>
          {sectionTitle}
        </h1>
        <h2 className="thirty-six font-semibold">{title}</h2>
        <p style={{ color: theme.colors.text.secondary }}>{subTitle}</p>
      </div>
      {children}
    </div>
  );
};

export default InfoWrapper;
