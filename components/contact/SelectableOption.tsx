import { useId } from "react";

type SelectableOptionProps = {
  name: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
};

export function SelectableOption({ name, label, description, checked, onChange }: SelectableOptionProps) {
  const descriptionId = useId();
  return (
    <label className="group relative cursor-pointer">
      <input aria-label={label} aria-describedby={description ? descriptionId : undefined} className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" type="radio" name={name} value={label} checked={checked} onChange={onChange} />
      <span className={`${description ? "flex h-full items-start rounded-2xl p-4" : "inline-flex items-center rounded-full px-4 py-2.5"} min-h-11 gap-2 border border-white/25 text-sm font-medium text-teal-50 transition-colors duration-300 group-hover:border-white/50 group-hover:bg-white/10 peer-checked:border-teal-200 peer-checked:bg-teal-200 peer-checked:text-[#0F4C45] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-teal-200 motion-reduce:transition-none`}>
        <span aria-hidden="true" className={`text-xs ${checked ? "opacity-100" : "opacity-50"}`}>{checked ? "✓" : "+"}</span>
        <span>
          <span className={description ? "font-semibold" : undefined}>{label}</span>
          {description && <span id={descriptionId} className="mt-1 block text-sm font-normal leading-5 opacity-85">{description}</span>}
        </span>
      </span>
    </label>
  );
}
