import React from "react";
import {Button, Container, Menu} from "semantic-ui-react";

interface IProps {
    openCreateActivityForm:(editMode:boolean) => void;
}

const NavBar: React.FC<IProps> = ({openCreateActivityForm}) => {
    return (
        <Menu fixed={"top"} inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={() => openCreateActivityForm(true)}/>
                </Menu.Item>
            </Container>

        </Menu>
    )
}

export default NavBar
