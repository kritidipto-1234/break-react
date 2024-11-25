import { useState,useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RTKQueryFetch } from './RTKQueryFetch';

// Main component showing both side by side
const StateMangement = () => {
    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '2rem',
            padding: '1rem' 
        }}>
            {/* <TraditionalFetch /> */}
            {/* <TraditionalFetch /> */}

            {/* <ReactQueryFetch />
            <ReactQueryFetch />

            <ReduxFetch />
            <ReduxFetch /> */}

            <RTKQueryFetch />
            <RTKQueryFetch />

        </div>
    );
};

export default StateMangement;