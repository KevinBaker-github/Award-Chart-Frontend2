import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';




const ProfileMenu = ({logOutHandler, userId}) => {

    return (
        <>
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true" variant="secondary">
                    {userId}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={logOutHandler}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}


export default ProfileMenu;
