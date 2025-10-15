interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="rounded-lg border border-primary/50 bg-card px-6 py-4 shadow-glow-strong backdrop-blur-glass">
        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
