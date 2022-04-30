const AuthValidationErrors = ({ errors = [], ...props }) => (
  <>
    {errors.length > 0 && (
      <div {...props}>
        <div className="font-medium text-red-600">
          Whoops! Quelque chose s'est mal passé.
        </div>
        <ul className="mt-3 list-disc list-inside text-sm text-red-600">
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )}
  </>
)

export default AuthValidationErrors
