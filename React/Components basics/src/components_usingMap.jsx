
function Components() {
    const people = ["shobuj", "karim", "rahim", "lilu", "shorisha"]
    return (
        <>
        {
            people.map(manush => <h1> ami {manush}</h1>)
            // map used for iterating all the elements in an array or object
            // eta kintu dynamic, ami jodi upore people array er ekta element shorai feli tahole etar iteration o hobena,kono faka space dibena
        }
        </>
    )
}
export default Components;