import Button from "./button";

type SHProp = {
  title: string;
  body: string;
  buttonValue?: string;
  buttonAction: string;
};
export default function SectionHeader(data: SHProp) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full items-center justify-center max-w-180 flex flex-col gap-5">
        <div className="w-fit">
        <h2 className="text-center custom5 text-5xl sm:text-6xl lg:text-[75px] text-(--primary) leading-none tracking-body">
          {data.title}
          </h2>
        </div>
        <div className="w-full max-w-100 flex flex-col justify-center items-center gap-5">
          <p className="text-center text-lg text-(--secondary) leading-body custom3 font-medium tracking-body">
            {data.body}
          </p>
          {data.buttonValue ? (
            <Button title={data.buttonValue} LinkTo={data.buttonAction} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
