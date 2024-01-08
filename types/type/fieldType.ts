import FigureUnionType from "./FigureUnionType";
import colorType from "./colorType";

type fieldType={
    actualField: string[];
    color: colorType;
    moved: boolean;
    name: FigureUnionType
}|''

export default fieldType