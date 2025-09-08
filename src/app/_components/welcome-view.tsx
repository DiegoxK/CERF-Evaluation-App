import { ArrowLeft, ListChecks, PenSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiVercel, SiOpenai } from "react-icons/si";

const FeatureCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="bg-card/50">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
      <div className="bg-primary/10 text-primary rounded-lg p-2">{icon}</div>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">{children}</p>
    </CardContent>
  </Card>
);

const TechIcon = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <div className="text-muted-foreground hover:text-foreground flex flex-col items-center gap-2 transition-colors">
    {icon}
    <span className="text-xs">{name}</span>
  </div>
);

export const WelcomeView = () => {
  return (
    <div className="animate-fade-in mx-auto flex max-w-4xl flex-col items-center space-y-12 py-8 text-center">
      <div className="space-y-4">
        <h1 className="from-primary bg-gradient-to-r to-purple-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          Unlock Your English Proficiency
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Get instant, AI-powered feedback on your writing. This app analyzes
          your text and provides a detailed CEFR evaluation to help you improve.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        <FeatureCard icon={<ListChecks size={24} />} title="1. Select a Task">
          Choose a writing prompt from the sidebar to get started. Each task is
          designed to test different skills.
        </FeatureCard>
        <FeatureCard icon={<PenSquare size={24} />} title="2. Write Your Text">
          Compose your response in the provided editor. Take your time to write
          as clearly and accurately as possible.
        </FeatureCard>
        <FeatureCard
          icon={<Sparkles size={24} />}
          title="3. Get Your Evaluation"
        >
          Submit your text to receive a comprehensive report, including your
          CEFR level, category ratings, and specific suggestions.
        </FeatureCard>
      </div>

      <div className="bg-card flex items-center gap-4 rounded-lg border p-4">
        <ArrowLeft className="text-primary h-6 w-6" />
        <p className="font-medium">
          Ready to begin? Select a task from the sidebar!
        </p>
      </div>

      <div className="w-full space-y-4 rounded-lg border border-dashed p-6">
        <h3 className="text-muted-foreground text-sm font-semibold uppercase">
          Powered By Modern Technology
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
          <TechIcon icon={<SiNextdotjs size={28} />} name="Next.js" />
          <TechIcon icon={<FaNodeJs size={28} />} name="Node.js" />
          <TechIcon icon={<FaReact size={28} />} name="React" />
          <TechIcon icon={<SiTypescript size={28} />} name="TypeScript" />
          <TechIcon icon={<SiOpenai size={28} />} name="Vercel AI SDK" />
          <TechIcon icon={<SiVercel size={28} />} name="Vercel" />
        </div>
      </div>
    </div>
  );
};
