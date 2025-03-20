import { BaseWrapper } from "../components";
import { ArtText as ArtTextComp } from "../components/ArtText";
export const ArtText = () => {
	return (
		<BaseWrapper>
			<div className="h-full w-full flex flex-items-center flex-justify-center">
				<ArtTextComp>Aoshisen</ArtTextComp>
			</div>
		</BaseWrapper>
	)
}