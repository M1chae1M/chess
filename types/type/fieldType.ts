import FigureUnionType from "./FigureUnionType";

type fieldType={
    actualField: string[];
    color: 'white'|"black";
    moved: boolean;
    name: FigureUnionType
}|''

export default fieldType