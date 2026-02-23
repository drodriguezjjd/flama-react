import { useState } from 'react'
import {
  FLMenu, FLMenuItems, FLUser, FLAction, FLActions,
  FLBody, FLTitle, FLSubtitle, FLRow, FLCol, FLSection,
  FLButton, FLButtons,
  FLInputField, FLSelectField, FLCheck,
  FLTip, FLTag, FLSpinner, FLLoader, FLModal,
  FLTabs, FLPaginator, FLBreadcrumbs,
  FLCard, FLCardBody, FLCardTitle, FLCardMessage, FLCardDescription,
  FLList, FLItem, FLIcon, FLTable,
  FLData, FLPayment,
} from '../lib/index.js'

// ─────────────────────────────────────────────
// Sección de demo con título
// ─────────────────────────────────────────────
function DemoBlock({ title, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{
        margin: 0,
        fontSize: 11,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#aaa',
        borderBottom: '1px solid #eee',
        paddingBottom: 8,
      }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function Row({ children }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>{children}</div>
}

// ─────────────────────────────────────────────
// App principal
// ─────────────────────────────────────────────
export default function App() {
  const [menuTab, setMenuTab]     = useState(0)
  const [tab, setTab]             = useState(0)
  const [page, setPage]           = useState(1)
  const [check, setCheck]         = useState(false)
  const [radio, setRadio]         = useState('a')
  const [inputVal, setInputVal]   = useState('')
  const [pwVal, setPwVal]         = useState('')
  const [emailVal, setEmailVal]   = useState('')
  const [selectVal, setSelectVal] = useState('')
  const [modalVisible, setModalVisible]   = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(false)
  const [tipType, setTipType] = useState('correct')

  const countryOptions = [
    { value: 'cl', label: 'Chile' },
    { value: 'ar', label: 'Argentina' },
    { value: 'pe', label: 'Perú' },
    { value: 'co', label: 'Colombia' },
    { value: 'mx', label: 'México' },
  ]

  const tableColumns = [
    { key: 'name',   label: 'Nombre' },
    { key: 'role',   label: 'Rol' },
    { key: 'method', label: 'Pago', align: 'center' },
    { key: 'status', label: 'Estado', align: 'center' },
  ]

  const tableRows = [
    { name: 'Ana García',   role: 'Administrador', method: <FLPayment method="visa" />,       status: <FLTag type="active">Activo</FLTag> },
    { name: 'Luis Pérez',   role: 'Usuario',       method: <FLPayment method="mastercard" />, status: <FLTag type="inactive">Inactivo</FLTag> },
    { name: 'María López',  role: 'Local',         method: <FLPayment method="cash" />,        status: <FLTag type="local">Local</FLTag> },
    { name: 'Carlos Ruiz',  role: 'Administrador', method: <FLPayment method="app" />,         status: <FLTag type="admin">Admin</FLTag> },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f4f6f8' }}>

      {/* ── Menú superior ── */}
      <FLMenu>
        <span style={{ fontWeight: 'bold', color: '#EC0000', fontSize: 18, marginRight: 8 }}>
          🔥 Flama
        </span>
        <FLMenuItems
          items={[
            { label: 'Inicio' },
            { label: 'Clientes' },
            { label: 'Reportes', indicator: true },
          ]}
          active={menuTab}
          onChange={setMenuTab}
        />
        <FLUser label="Administrador" name="Juan Pérez" />
        <FLAction icon="cog" main />
        <FLAction icon="user" badge="3" />
      </FLMenu>

      {/* ── Breadcrumbs ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '10px 40px' }}>
        <FLBreadcrumbs items={[
          { label: 'Inicio', onClick: () => {} },
          { label: 'Componentes', onClick: () => {} },
          { label: 'Demo interactiva' },
        ]} />
      </div>

      {/* ── Cuerpo ── */}
      <FLBody style={{ padding: '32px 40px', gap: 40 }}>

        <div>
          <FLTitle>Flama React</FLTitle>
          <FLSubtitle>Demo interactiva de todos los componentes</FLSubtitle>
        </div>

        {/* ── BOTONES ── */}
        <DemoBlock title="Botones">
          <Row>
            <FLButton onClick={() => alert('¡Click!')}>Primario</FLButton>
            <FLButton outline>Outline</FLButton>
            <FLButton clear>Clear</FLButton>
            <FLButton clear primary>Clear Primary</FLButton>
            <FLButton disabled>Deshabilitado</FLButton>
          </Row>
          <Row>
            <FLButton small>Small</FLButton>
            <FLButton small outline>Small Outline</FLButton>
            <FLButton compact>Compact</FLButton>
          </Row>
          <FLButtons separate>
            <FLButton outline>Cancelar</FLButton>
            <FLButton>Confirmar</FLButton>
          </FLButtons>
        </DemoBlock>

        {/* ── ÍCONOS ── */}
        <DemoBlock title="Íconos">
          <Row>
            {['calendar', 'user', 'lock', 'email', 'trash', 'download', 'cog', 'filter', 'dots', 'add', 'eye', 'eye-no'].map(i => (
              <FLIcon key={i} icon={i} title={i} style={{ cursor: 'help' }} />
            ))}
          </Row>
          <Row>
            <FLButton outline>
              <FLIcon icon="download" />
              Exportar
            </FLButton>
            <FLButton>
              <FLIcon icon="add" />
              Agregar
            </FLButton>
          </Row>
        </DemoBlock>

        {/* ── ACTIONS ── */}
        <DemoBlock title="Actions (botones circulares)">
          <Row>
            <FLAction icon="user" />
            <FLAction icon="cog" />
            <FLAction icon="trash" />
            <FLAction icon="dots" main>
              <FLList>
                <FLItem onClick={() => alert('Editar')}>Editar</FLItem>
                <FLItem onClick={() => alert('Eliminar')}>Eliminar</FLItem>
              </FLList>
            </FLAction>
            <FLAction icon="user" badge="5" />
            <FLAction icon="user" disabled />
            <FLAction avatar>JP</FLAction>
          </Row>
        </DemoBlock>

        {/* ── TAGS ── */}
        <DemoBlock title="Tags">
          <Row>
            <FLTag type="active">Activo</FLTag>
            <FLTag type="inactive">Inactivo</FLTag>
            <FLTag type="admin">Admin</FLTag>
            <FLTag type="local">Local</FLTag>
          </Row>
        </DemoBlock>

        {/* ── TIPS ── */}
        <DemoBlock title="Tips / Alertas">
          <Row>
            {['correct', 'error', 'warn', 'info'].map(t => (
              <FLButton key={t} small outline onClick={() => setTipType(t)}>
                {t}
              </FLButton>
            ))}
          </Row>
          <FLTip visible type={tipType}>
            {tipType === 'correct' && 'Operación realizada correctamente.'}
            {tipType === 'error'   && 'Ha ocurrido un error. Intenta nuevamente.'}
            {tipType === 'warn'    && 'Atención: revisa los datos antes de continuar.'}
            {tipType === 'info'    && 'Esta acción puede tardar unos momentos.'}
          </FLTip>
        </DemoBlock>

        {/* ── TABS ── */}
        <DemoBlock title="Tabs">
          <FLTabs
            tabs={['General', 'Seguridad', 'Notificaciones', 'Facturación']}
            active={tab}
            onChange={setTab}
          />
          <FLSection>
            <p style={{ margin: 0, color: '#767676' }}>
              Contenido de la pestaña: <strong>{['General', 'Seguridad', 'Notificaciones', 'Facturación'][tab]}</strong>
            </p>
          </FLSection>
        </DemoBlock>

        {/* ── INPUTS ── */}
        <DemoBlock title="Inputs">
          <FLRow>
            <FLCol>
              <FLInputField
                label="Nombre de usuario"
                icon="user"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                clearable
              />
              <FLInputField
                label="Contraseña"
                icon="lock"
                type="password"
                value={pwVal}
                onChange={(e) => setPwVal(e.target.value)}
                password
              />
              <FLInputField
                label="Correo electrónico"
                icon="email"
                type="email"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                clearable
              />
            </FLCol>
            <FLCol>
              <FLInputField
                label="Campo con error"
                value=""
                onChange={() => {}}
                error="Este campo es obligatorio"
              />
              <FLInputField
                label="Campo deshabilitado"
                value="No editable"
                onChange={() => {}}
                disabled
              />
              <FLSelectField
                label="País"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
                options={countryOptions}
              />
            </FLCol>
          </FLRow>
        </DemoBlock>

        {/* ── CHECKS ── */}
        <DemoBlock title="Checks y Radios">
          <Row>
            <FLCheck
              type="checkbox"
              label="Acepto los términos y condiciones"
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
            />
            <FLCheck type="checkbox" label="Deshabilitado" checked={false} onChange={() => {}} disabled />
          </Row>
          <Row>
            {['Opción A', 'Opción B', 'Opción C'].map((opt) => (
              <FLCheck
                key={opt}
                type="radio"
                label={opt}
                checked={radio === opt}
                onChange={() => setRadio(opt)}
              />
            ))}
          </Row>
        </DemoBlock>

        {/* ── CARDS ── */}
        <DemoBlock title="Cards">
          <FLRow>
            <FLCol>
              <FLCard>
                <FLCardBody>
                  <FLCardTitle>Tarjeta estándar</FLCardTitle>
                  <FLCardMessage>Este es el mensaje principal de la tarjeta.</FLCardMessage>
                  <FLCardDescription>
                    Descripción adicional con más detalle.{' '}
                    <a href="#">Ver más</a>
                  </FLCardDescription>
                </FLCardBody>
                <FLButtons center>
                  <FLButton small outline>Cancelar</FLButton>
                  <FLButton small>Confirmar</FLButton>
                </FLButtons>
              </FLCard>
            </FLCol>
            <FLCol>
              <FLCard align="left">
                <FLCardBody>
                  <FLCardTitle>Alineado izquierda</FLCardTitle>
                  <FLCardMessage>Contenido alineado a la izquierda.</FLCardMessage>
                  <FLCardDescription>Texto descriptivo adicional con más información relevante.</FLCardDescription>
                </FLCardBody>
              </FLCard>
            </FLCol>
          </FLRow>
        </DemoBlock>

        {/* ── DATA ── */}
        <DemoBlock title="FLData — bloques de información">
          <FLSection>
            <FLRow>
              <FLCol>
                <FLData label="Nombre completo">Juan Antonio Pérez López</FLData>
              </FLCol>
              <FLCol>
                <FLData label="RUT">12.345.678-9</FLData>
              </FLCol>
              <FLCol>
                <FLData label="Total a pagar" money>$1.250.000</FLData>
              </FLCol>
              <FLCol>
                <FLData label="Método de pago" method="visa">Visa terminada en 4321</FLData>
              </FLCol>
            </FLRow>
          </FLSection>
        </DemoBlock>

        {/* ── PAGINATOR ── */}
        <DemoBlock title="Paginador">
          <FLPaginator total={15} current={page} onChange={setPage} />
          <p style={{ margin: 0, fontSize: 13, color: '#767676' }}>Página actual: {page} / 15</p>
        </DemoBlock>

        {/* ── TABLE ── */}
        <DemoBlock title="Tabla">
          <FLTable columns={tableColumns} rows={tableRows} />
        </DemoBlock>

        {/* ── SPINNER ── */}
        <DemoBlock title="Spinner">
          <Row>
            <FLSpinner size="small" />
            <FLSpinner size="medium" />
            <FLSpinner />
          </Row>
        </DemoBlock>

        {/* ── MODAL ── */}
        <DemoBlock title="Modal">
          <Row>
            <FLButton onClick={() => setModalVisible(true)}>Abrir Modal</FLButton>
          </Row>
          <FLModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <FLCard message>
              <FLCardBody>
                <FLCardTitle>¿Confirmar acción?</FLCardTitle>
                <FLCardMessage>Esta operación no se puede deshacer.</FLCardMessage>
                <FLCardDescription>
                  Al confirmar, los datos serán eliminados permanentemente del sistema.
                </FLCardDescription>
              </FLCardBody>
              <FLButtons center>
                <FLButton outline small onClick={() => setModalVisible(false)}>Cancelar</FLButton>
                <FLButton small onClick={() => { alert('¡Confirmado!'); setModalVisible(false) }}>Aceptar</FLButton>
              </FLButtons>
            </FLCard>
          </FLModal>
        </DemoBlock>

        {/* ── LOADER ── */}
        <DemoBlock title="Loader global">
          <Row>
            <FLButton
              onClick={() => {
                setLoaderVisible(true)
                setTimeout(() => setLoaderVisible(false), 2500)
              }}
            >
              Mostrar Loader (2.5s)
            </FLButton>
          </Row>
          <FLLoader visible={loaderVisible} message="Procesando..." />
        </DemoBlock>

      </FLBody>
    </div>
  )
}
