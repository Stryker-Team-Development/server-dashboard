import { Button } from '@mui/material';
import {
    Link
} from "react-router-dom";

function BackButton() {
    return (
        <Link to='/'>
                <Button color='primary'>
                    {"< Go back"}
                </Button>
            </Link>
    )
}

export default BackButton;
