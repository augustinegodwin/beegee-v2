import Button from "./button";

type SHProp = {
  title: string;
  body: string;
  buttonValue?: string;
  buttonAction: string;
  colouredText:string
};
export default function SectionHeader(data: SHProp) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex items-end justify-between flex flex-col lg:flex-row gap-5">
        <div className="max-w-150 w-full">
        <h2 className="text-left custom8 text-4xl sm:text-6xl  text-(--primary) leading-none tracking-header">
          {data.title.includes(data.colouredText) ? (
  <>
    {data.title.split(data.colouredText)[0]}
    <b className="custom8 text-green-700">{data.colouredText}</b>
    {data.title.split(data.colouredText)[1]}
  </>
) : (
  data.title
)}

          </h2>
        </div>
        <div className="w-full max-w-100 flex flex-col justify-center items-end gap-5">
          <p className="text-right text-lg text-(--secondary) leading-body custom3 font-medium tracking-body">
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
