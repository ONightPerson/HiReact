const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
            </tr>
        </thead>
    );
}

const TableBody = (props) => {
    const rows = props.characterData.map((element, index) => {
        return (
            <tr key={index}>
                <td>{element.name}</td>
                <td>{element.job}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>删除</button>
                </td>
            </tr>
        )
    });

    return (
        <tbody>
            {rows}
        </tbody>
    );
}

const Table = (props) => {
    return (
        <table>
            <TableHeader />
            <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
        </table>
    )
}

export default Table