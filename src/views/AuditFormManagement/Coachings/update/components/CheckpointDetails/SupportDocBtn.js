import React from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

function SupportDocBtn(props) {
    const { cid, detail_id, imgr, showDocDeleteModel, ...rest } = props;

    return (
    <>
        <Button variant="text" color="primary" size="small" style={{fontSize:"0.7rem",padding:"0"}}>
            <u>{imgr.name}</u>
        </Button>
        <Button
            className="btn-choose"
            size="small"
            color="primary"
            component="label"
            startIcon={<DeleteIcon />}
            onClick={()=>{ showDocDeleteModel(cid, detail_id, imgr.uid) }}
            style={{color: '#dc3545', minWidth: '30px', padding: '0px', fontSize:"0.8rem"}}
        />
        
    </>
    );
}

export default SupportDocBtn;
