import { LinearBg as LinearBgWrapper, ArtText } from "../components";
export const LinearBg = () => {
	return (
		<LinearBgWrapper>
			<div className="h-screen w-screen flex flex-items-center flex-justify-center">
				<ArtText>
					linear-gradient
				</ArtText>
			</div>
		</LinearBgWrapper>
	)
}
