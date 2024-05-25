namespace Backend_Rentify.Business.Models
{
    public class BaseResponse
    {
        public BaseResponse()
        {
            IsSuccess = true;
        }
        public bool IsSuccess { get; set; }
        public string? Exception { get; set; }
        public string? StackTrace { get; set; }

    }
}
