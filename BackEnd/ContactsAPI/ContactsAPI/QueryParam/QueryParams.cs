namespace ContactsAPI.QueryParam
{
    public class QueryParams
    {
        public int _currentPage = 1;
        public int _totalRows = 50;
        public string _query;
        public string _field;
        public int _starred = 2;
        public int _page = 10;
        public string _sortDirection = "asc";

        public int CurrentPage {
            get { return _currentPage; }
            set { _currentPage = value; }
        }
        public int TotalRows
        {
            get { return _totalRows; }
            set { _totalRows = value; }
        }
        public string Query
        {
            get { return _query; }
            set { _query = value; }
        }
        public string Field
        {
            get { return _field; }
            set { _field = value; }
        }
        public int Starred
        {
            get { return _starred; }
            set { _starred = value; }
        }
        public int Page
        {
            get { return _page; }
            set { _page = value; }
        }
        public string SortDirection
        {
            get { return _sortDirection; }
            set { _sortDirection = value; }
        }

    }
}
