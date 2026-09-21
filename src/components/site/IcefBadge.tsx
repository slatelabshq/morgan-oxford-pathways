import { useEffect } from "react";
import { cn } from "@/lib/utils";

const ICEF_ACCOUNT_ID = "4923";
const ICEF_SCRIPT_SRC = "https://www-cdn.icef.com/scripts/iasbadgeid.js";

type IcefBadgeProps = {
  className?: string;
};

/**
 * Official ICEF IAS badge — account 4923.
 * @see https://www.icef.com
 */
export function IcefBadge({ className }: IcefBadgeProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector(`script[src="${ICEF_SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = ICEF_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

  return (
    <div className={cn("inline-flex items-center", className)} aria-label="ICEF accredited agency">
      <span id="iasBadge" data-account-id={ICEF_ACCOUNT_ID} />
    </div>
  );
}
