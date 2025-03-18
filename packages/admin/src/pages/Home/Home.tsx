import { CSSProperties } from "react";
import routes from "../../constant/routes";
import { Button } from "../../components";
import { useNavigate } from "react-router";

function Home() {
	const navigate = useNavigate()
	const handleLinkClick = (path: string) => {
		navigate(path)
	}
	return (
		<div className="h-screen flex flex-items-center flex-justify-center">
			<div className=" shadow-md shadow-gray-2 w-xl h-xl flex flex-items-center flex-justify-center p-4" >
				<div
					style={{
						['--grid-min-col-size']: "150px"
					} as CSSProperties}
					className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,var(--grid-min-col-size,200px)),1fr))] gap-4 w-full"
				>
					{routes.map(route => {
						return <Button key={route.path}
							onClick={() => handleLinkClick(route.path!)}>
							{route.path?.slice(1)}
						</Button>

					})}
				</div>
			</div>
		</div >
	);
}


export default Home