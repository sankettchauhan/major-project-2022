import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";

export default function CardNewSection({
  disabled,
  section,
  sectionTitleRef,
  sectionContentRef,
  sectionOrderRef,
  stepNumber,
  addSection,
}) {
  return (
    <>
      <div className="flex flex-col w-[370px] bg-[#006E7F] text-[#F8CB2E] p-8 rounded-2xl shadow-2xl shadow-[#006E7F]">
        <h1 className="text-xl uppercase font-bold mb-2">
          {stepNumber}. Add section
        </h1>
        <Input
          type="text"
          placeholder="Enter title of section"
          value={section?.title}
          disabled={disabled}
          ref={sectionTitleRef}
        />
        <Textarea
          placeholder="Enter content of section"
          value={section?.content}
          disabled={disabled}
          ref={sectionContentRef}
        />
        <Input
          type="text"
          placeholder="Enter order of section"
          value={section?.order}
          disabled={disabled}
          ref={sectionOrderRef}
        />
        {addSection && (
          <div className="mt-3">
            <Button onClick={addSection}>Create section</Button>
          </div>
        )}
      </div>
    </>
  );
}
