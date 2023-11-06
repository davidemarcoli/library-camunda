"use client";

export default function Welcome() {

    return (
        <div className={'flex flex-col justify-center items-center'}>
            <h1 className={'mt-4 text-4xl font-bold'}>Welcome to the <span
                className={'text-blue-500'}>Dalama</span> Library</h1>
            <div className={'mt-4 text-xl flex flex-col justify-center'}>
                Here you can borrow books from the library.<br/>
                There are many books to choose from.<br/>
                For kids, for adults, for everyone.
            </div>
        </div>
    );
}
