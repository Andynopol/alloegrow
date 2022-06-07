import React from 'react';
import { IconButton, TableCell, TableRow, Collapse, Box, Table, TableBody, TableHead, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Planification } from '../../constants/interfaces';


interface Props {
    row: Planification;
}

const CollapsableRow: React.FC<Props> = ( props: Props ) => {
    const { row } = props;
    const [ open, setOpen ] = React.useState( false );

    const formatHM: ( timestamp: Date ) => string = ( timestamp: Date ) => {
        return `${ Number( timestamp.getHours() ) < 10 ? 0 : '' }${ timestamp.getHours() }:${ Number( timestamp.getMinutes() ) < 10 ? 0 : '' }${ timestamp.getMinutes() }`;
    };


    return (
        <React.Fragment>
            <TableRow sx={ { '& > *': { borderBottom: 'unset' } } }>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={ () => setOpen( !open ) }
                    >
                        { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
                    </IconButton>
                </TableCell>
                <TableCell component="th" align="center" scope="row">
                    { new Date( row.date ).toLocaleDateString() }
                </TableCell>
                <TableCell align="center">{ row.name }</TableCell>
                <TableCell align="center">{ formatHM( new Date( row.start ) ) }</TableCell>
                <TableCell align="center">{ formatHM( new Date( row.end ) ) }</TableCell>
                <TableCell align="center">{ row.count }</TableCell>
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell style={ { paddingBottom: 0, paddingTop: 0 } } colSpan={ 6 }>
                    <Collapse in={ open } timeout="auto" unmountOnExit>
                        <Box sx={ { margin: 1 } } className="dropdown-table">
                            <Typography variant="h6" gutterBottom style={ { textAlign: "center" } } component="div">
                                Plan
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Nr</TableCell>
                                        <TableCell align='right'>Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        row.plan.map( ( plan: Date, index: number ) => {
                                            const timestamp = new Date( plan );
                                            return ( <TableRow key={ `${ timestamp.getMilliseconds() }${ Math.floor( Math.random() * 1000 ) }` }>
                                                <TableCell align='left' component="th" scope="row">
                                                    { index + 1 }
                                                </TableCell>
                                                <TableCell align='right' component="th" scope="row">
                                                    { formatHM( timestamp ) }
                                                </TableCell>
                                            </TableRow> );
                                        } )
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default CollapsableRow;