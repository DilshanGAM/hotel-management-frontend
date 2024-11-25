import { Route, Routes } from "react-router-dom";
import Header from "../../components/header/header";
import HomePage from "./homePage";

export function CustomerPage() {
	return (
		<>
			<Header />
            <div style={
                {
                    backgroundImage: "url(/s.jpg)",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    height: "100vh"
                }
            }>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
		</>
	);
}
