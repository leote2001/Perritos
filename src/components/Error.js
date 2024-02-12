function Error({err}) {
return (
<div className="alert-danger" role="alert">
    <p>{err}</p>
</div>
);
}
export {Error};