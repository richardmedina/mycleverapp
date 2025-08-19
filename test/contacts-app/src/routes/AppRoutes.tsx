import { Route, Routes } from "react-router-dom";
import LoginContainer from "../containers/login/LoginContainer";
import NotFoundContainer from "../containers/not-found/NotFound";
import ContactContainer from "../containers/contacts/ContactsContainer";
import HomeContainer from "../containers/home/HomeContainer";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/contacts" element={<ContactContainer />} />
            <Route path="*" element={<NotFoundContainer />} />
        </Routes>
    );
}

export default AppRoutes;