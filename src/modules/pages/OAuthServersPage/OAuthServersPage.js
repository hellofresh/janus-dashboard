import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchingContainer from '../../SearchBar/searchContainer';
import OAuthServersContainer from './oAuthServersContainer';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import Button from '../../buttons/Button';

const OAuthServersPage = () => {
    return (
        <div>
            <Section>
                <Row>
                    <Title>oAuth Servers</Title>
                    <Row>
                        <SearchingContainer />
                        <Link to="/oauth/servers/new">
                            <Button mod="primary">+ Create New oAuth Server</Button>
                        </Link>
                    </Row>
                </Row>
            </Section>
            <Section>
                <OAuthServersContainer />
            </Section>
        </div>
    );
};

export default OAuthServersPage;