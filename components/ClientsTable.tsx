'use client'

import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type IntellifloListResponse<T> = {
    href: string
    items: T[]
    count: number
}

type IntellifloLink = {
    id: number
    name: string
    href: string
}

type IntellifloPerson = {
    firstName: string
    lastName: string
    gender: string
    isDeceased: boolean
    territorialProfile: never | null
}

type IntellifloClient = {
    id: number
    href: string
    name: string
    createdAt: string
    externalReference: number
    originalAdviser: IntellifloLink | null
    currentAdviser: IntellifloLink | null
    type: string
    partyType: string
    person: IntellifloPerson
    addresses_href: string
    contactdetails_href: string
    plans_href: string
    relationships_href: string
    servicecases_href: string
    dependants_href: string
    tags: never[]
    serviceStatus: never | null
    clientSegment: never | null
    group: {
        id: number,
        href: string,
    } | null
}

type ClientsTableResponse = IntellifloListResponse<IntellifloClient>;

export const ClientsTable = () : React.ReactNode => {
    const { data, error, isLoading } = useSWR<ClientsTableResponse>('/api/iflo/clients', fetcher);

    if (isLoading) return <div>Loading...</div>;
    if (error || !data) return <div>Failed to load</div>;

    return (
        <div className="my-3 p-5 rounded-box border border-base-content/5">
            <div className="mb-3 mx-2">
                <h1 className="text-3xl">Clients ({data.count})</h1>
                <p>Communicating with <span className="font-mono">/v2/clients</span> to return a list of clients.</p>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Adviser</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.currentAdviser?.name ?? 'N/A'}</td>
                                <td>{client.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};