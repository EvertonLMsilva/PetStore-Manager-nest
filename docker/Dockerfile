# Usar a imagem oficial do Kong com Ubuntu
FROM kong:ubuntu

# Trocar para o usuário root para instalação das dependências
USER root
# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    luarocks \
    libssl-dev \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Crie os diretórios necessários e ajuste as permissões
RUN mkdir -p /usr/local/share/lua/5.1/kong/plugins/jwt-keycloak /usr/local/share/lua/5.1/kong/plugins/oidc && \
    chown -R kong:kong /usr/local/share/lua/5.1/kong/plugins

# Defina o caminho Lua package path para o Kong
ENV KONG_LUA_PACKAGE_PATH="/usr/local/share/lua/5.1/?.lua;;"

# Instalar a biblioteca lua-resty-openidc via LuaRocks
RUN luarocks install lua-resty-openidc

# Instalar outros módulos necessários
RUN luarocks install kong-plugin-jwt-keycloak

# Copiar os plugins personalizados para o Kong
COPY ./plugins/kong-plugin-jwt-keycloak/* /usr/local/share/lua/5.1/kong/plugins/jwt-keycloak
COPY ./plugins/kong-plugin-oidc/* /usr/local/share/lua/5.1/kong/plugins/oidc/

# Retornar para o usuário kong
USER kong