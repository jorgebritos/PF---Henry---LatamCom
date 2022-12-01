

export default function FiltroBrand({s, brands, handleOnChange, filterBrands, checkedState}){
  return(
  <div className={s.filtro}>
  <h4 className={s.h4}>Filter By Brand</h4>
  <ul>
    {brands.length > 0
      ? brands.map((b, index) => {
          return (
            <li className={s.li} key={b}>
              <label className={s.label}>
                <input
                  className={s.input}
                  type={'checkbox'}
                  checked={checkedState[index]}
                  value={b}
                  onChange={(e) => handleOnChange(index, e)}
                />
                <span className={s.spanC}>{b}</span>
              </label>
            </li>
          );
        })
      : null}
  </ul>
  <button className={s.btn} onClick={(e) => filterBrands(e)}>
    Filter
  </button>
</div>
)
}