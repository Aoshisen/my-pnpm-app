import { CSSProperties } from "react";
import routes from "../constant/routes";
import { BaseWrapper, Button } from "../components";
import { useNavigate } from "react-router";

export const Home=()=> {
	const navigate = useNavigate()
	const handleLinkClick = (path: string) => {
		navigate(path)
	}
	return (
		<BaseWrapper>
			<div className=" w-full h-full p-8" >
				<div
					style={{
						['--grid-min-col-size']: "150px"
					} as CSSProperties}
					className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--grid-min-col-size,200px)),1fr))] gap-4 w-full "
				>
					{routes.map(route => {
						return <Button key={route.path}
							onClick={() => handleLinkClick(route.path!)}>
							{route.path?.slice(1)}
						</Button>

					})}
				</div>
			</div>
		</BaseWrapper>
	);
}

