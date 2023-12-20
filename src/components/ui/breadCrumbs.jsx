import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

// import { Capitalize1stLetter } from 'utils/helpers';
const Capitalize1stLetter = (value) => value;


const BreadCrumbs =({ data }) => {
    return (
        <Breadcrumb className="mt-3">
            {data.map((d, i) =>
                d.path ? (
                    <Breadcrumb.Item key={i} linkAs={Link} linkProps={{ to: d.path }}>
                        {Capitalize1stLetter(d.text)}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item key={i} active={d.active}>
                        {Capitalize1stLetter(d.text)}
                    </Breadcrumb.Item>
                ),
            )}
        </Breadcrumb>
    );
};

export default BreadCrumbs;