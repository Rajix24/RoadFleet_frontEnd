import { useNavigate } from "react-router";

export default function PageStatus({
  status = 300,
  title = "in processe",
  message = "Page not release",
}) {
  const navigate = useNavigate();
  return (
    <div className="relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded-xl border bg-card p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">{title || "Page in Process"}</h1>
          <p className="mt-2 text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}
