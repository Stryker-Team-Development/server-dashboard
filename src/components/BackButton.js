import { Button } from '@mui/material';
import {
    useHistory
} from "react-router-dom";

function BackButton() {
    let history = useHistory();

    return (
        <>
          <Button onClick={() => history.goBack()}>Back</Button>
        </>
    );
}

export default BackButton;
